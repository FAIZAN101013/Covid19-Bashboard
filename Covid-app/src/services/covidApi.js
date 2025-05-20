export const fetchCovidHistory = async (countryCode = "usa") => {
    const res = await fetch(`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`);
    const data = await res.json();
    return data;
  };
  