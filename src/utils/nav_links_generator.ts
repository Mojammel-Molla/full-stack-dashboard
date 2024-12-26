import { TConfig } from "../types";

type TLink = {
    label: string;
    path: string;
};

const nav_links_generator = (config: TConfig[]): TLink[] => {
    const links = config?.reduce((arr, item) => {
        if (item?.label && item?.path) {
            arr.push({
                path: item.path,
                label: item.label,
            });
        }
        return arr;
    }, [] as TLink[]);

    return links;
};

export default nav_links_generator;
