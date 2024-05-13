class ImageProduct {
    id: number;
    title?: string;
    linkImg?: string;
    dataImg?: string;
    isIcon?: boolean;

    constructor(id: number,
        title: string,
        linkImg: string,
        dataImg: string,
        isIcon: boolean) {
        this.id = id;
        this.title = title;
        this.linkImg = linkImg;
        this.dataImg = dataImg;
        this.isIcon = isIcon;
    }
}

export default ImageProduct;