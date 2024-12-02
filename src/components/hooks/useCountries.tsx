import { CountryItem } from "@/components/Countries/components/CountryItem";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useRouter } from "@/i18n/routing";
import { CountryData } from "@/types/countries";
import { Option } from "@/types/option";
import { useLocale } from "next-intl";
import React, { useEffect, useMemo, useState, useCallback } from "react";

type UseCountriesReturnType = {
  searchQuery: string;
  countries: CountryData[];
  filteredCountries: CountryData[];
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  searchedOptions: Option[];
};

export const useCountries = (): UseCountriesReturnType => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const locale = useLocale();

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  // Fetch countries with error handling
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(
          `https://api2.yesim.co.uk/countries_for_sale?lang=${locale}`
        );
        const data = await response.json();

        if (!Array.isArray(data) || !data[0]) {
          throw new Error("Invalid API response");
        }

        const modified = data[0].map((country: CountryData) => ({
          ...country,
          icon: `/flags/${country.iso}.svg`, // Should be moved to a config or environment variable
        }));

        setCountries(modified);
      } catch (error) {
        console.log(error);
        router.push(`/error`);
        setCountries([]); // Reset data in case of an error
      }
    };

    getCountries();
  }, [locale, router]);

  // Normalize a string (memoized for performance)
  const normalizeStr = useCallback((str: string) => str.toLowerCase(), []);

  // Filter countries based on the search query
  useEffect(() => {
    if (!debouncedSearchQuery) {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter((country) => {
      const { country: countryName, iso, search } = country;

      return (
        normalizeStr(countryName).startsWith(
          normalizeStr(debouncedSearchQuery)
        ) ||
        normalizeStr(iso).startsWith(normalizeStr(debouncedSearchQuery)) ||
        search.some((query) =>
          normalizeStr(query).includes(normalizeStr(debouncedSearchQuery))
        )
      );
    });

    setFilteredCountries(filtered);
  }, [countries, debouncedSearchQuery, normalizeStr]);

  // Update the search query
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Create options for dropdown, based on searched country
  const searchedOptions: Option[] = useMemo(() => {
    if (filteredCountries.length === 0) {
      // Handle the No results found case explicitly
      return [];
    }

    // Map filtered countries to options
    return filteredCountries.map((country) => ({
      title: country.country,
      value: country.url,
      children: (
        <CountryItem
          country={country}
          bordered={false}
          showArrow
          hovered
          withPadding
        />
      ),
    }));
  }, [filteredCountries]);

  // Return a memoized object
  return useMemo(
    () => ({
      searchQuery,
      countries,
      filteredCountries,
      onChange,
      searchedOptions,
    }),
    [countries, filteredCountries, onChange, searchQuery, searchedOptions]
  );
};
