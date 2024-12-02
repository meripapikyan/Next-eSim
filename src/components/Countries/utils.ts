import { CountryData } from "@/types/countries";

export const getCountryPath = (country: CountryData) => {
  const searchParams = new URLSearchParams({
    country: country.country,
    iso: country.iso,
    firstOperatorPhoneView: encodeURIComponent(
      country.operators[0]?.phone_view || ""
    ),
    secondOperatorPhoneView: encodeURIComponent(
      country.operators[1]?.phone_view || ""
    ),
  });

  const pushOptions = `${country.url}?${searchParams.toString()}`;

  return `/${pushOptions}`;
};
