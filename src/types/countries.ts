interface Generation {
  name: string;
}

interface Operator {
  phone_view: string;
  prefix: string;
  generation: Generation[];
}

interface Price {
  amount: string;
  currency: string;
  iso2: string;
  iso3: string;
  symbol: string;
}

export interface CountryData {
  country: string;
  iso: string;
  id: string;
  fl_unlimited: string;
  cost_per_day: string;
  url: string;
  new: boolean;
  popular: string;
  cost_per_gb: string;
  search: string[];
  operators: Operator[];
  price: Price;
  price_per_day: Price;
  icon: string;
}
