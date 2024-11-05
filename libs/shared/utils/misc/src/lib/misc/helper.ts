// eslint-disable-next-line @typescript-eslint/no-namespace
namespace SharedHelper {
  // eslint-disable-next-line @typescript-eslint/ban-types
  export function jsonParser(data: object): object {
    // @ts-ignore
    Object.keys(data || {})?.forEach((key: string) => data[key] = data[key]['default']);
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  export function formatStringToBoolean(data: object): object {
    Object.keys(data || {})?.forEach((key: string) => {
      // @ts-ignore
      ['true', 'false'].includes(data[key]) && (data[key] = JSON.parse(data[key]?.toLowerCase?.()));
    });
    return data;
  }
}

export {SharedHelper as SharedHelper};
