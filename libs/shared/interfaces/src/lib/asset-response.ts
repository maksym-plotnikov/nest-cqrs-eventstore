export interface IAssetDimensions {
    width: number;
    height: number;
}

export interface IAssetResponse {
    url: string;
    previewUrl?: string;
    duration?: number;
    dimensions?: IAssetDimensions;
}
