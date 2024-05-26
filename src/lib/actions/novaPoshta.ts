import axios from "axios";

const apiKey = process.env.NOVA_POSHTA_API_KEY;
const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

export const searchSettlements = async (
  cityName: string,
  limit: string,
  page: string,
): Promise<any> => {
  try {
    const response = await axios.post(apiUrl, {
      apiKey: apiKey,
      modelName: "AddressGeneral",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: cityName,
        Limit: limit,
        Page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching settlements:", error);
    throw error;
  }
};

export const getWarehouses = async (cityRef: string): Promise<any> => {
  try {
    const response = await axios.post(apiUrl, {
      apiKey: apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        SettlementRef: cityRef,
        Limit: '20',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting warehouses:", error);
    throw error;
  }
};
