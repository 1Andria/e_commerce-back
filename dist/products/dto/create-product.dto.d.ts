declare class BoxItemDto {
    item: string;
    quantity: number;
}
export declare class CreateProductDto {
    category: string;
    title: string;
    price: number;
    description: string;
    features: string;
    inTheBox: BoxItemDto[];
}
export {};
