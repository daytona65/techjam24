import { Animated } from "react-native";

export interface IChoice {
    type: 'like' | 'nope';
}

export interface IUserActions {
    onDislike: () => void;
    onLike: () => void;
}

export interface ISwipeCardChildren {
    item: IProduct;
    swipe: Animated.ValueXY;
    isFirst: boolean;
    renderChoice: (swipe: any) => React.JSX.Element;
}

export interface IProduct {
    id: number;
    product_id: string; // "B07JW9H4J1" 
    product_name: string; // "Wayona Nylon Braided USB to Lightning Fast Charging and Data Sync Cabl…"
    category: string; // "Computers&Accessories|Accessories&Peripherals|Cables&Accessories|Cable…"
    discounted_price: string; // "₹399"
    actual_price: string;
    discount_percentage: string; // 64%
    rating: string; // " 4.2"
    rating_count: string; // " 234234"
    description: string;
    img_link: string;
}

export interface IProductDiscovery {
    productsDiscovery: IProduct[];
    // refetch: () => void; Add refetch function to refresh products when it is finished
}

type TPrevStateAct = (state: any) => any;
export interface ISwipeCard<T> {
    children: (
        item: T,
        swipe: Animated.ValueXY,
        isFirst: boolean,
    ) => React.ReactNode;
    items: T[];
    setItems: (fun: TPrevStateAct) => void;
    onSwipeUser: (swipe: Animated.ValueXY, prevState: T[]) => void;
}