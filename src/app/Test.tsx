import * as React from 'react';
import ImageCard from './ImageCard';

interface ImageItem {
    id: number;
    itemGroupId: string;
    title: string;
    description: string;
    imageLink: string;
}

interface ImageItems extends Array<ImageItem>{}

interface State {
    imageData: ImageItems | null;
    companyId: string | null;
}

class GetImageData {
    async getData(cid: string) {
        console.log(cid);
        let response = await fetch(
            'http://localhost:3001/products',
            {
                method: 'get'
            });

        return await response.json();
    }
}

export class ImageModal extends React.Component<any, State> {
    constructor(props:any) {
        super(props);

        this.state = {
            imageData: null,
            companyId: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (imgData: ImageItem) {
        const id = imgData.id;
        const itemGroupId = imgData.itemGroupId;
        const imageLink = imgData.imageLink;
        const title = imgData.title;
        const description = imgData.description;

        console.log(` id: ${id} \n itemGroupId: ${itemGroupId}, \n imageLink: ${imageLink}`
                    + `title: ${title} \n description: ${description}`);
    }

    componentDidMount () {
        const getImgData = new GetImageData();
        const companyId = window.localStorage.ajs_user_traits
            ? JSON.parse(window.localStorage.ajs_user_traits).companyId : '';

        getImgData.getData(`${companyId}`).then((data) => {
            // console.log(data);
            this.setState({
                ...this.state,
                imageData: data
            });
        });
    }

    render(): JSX.Element {

        const imgThumbs = this.state.imageData && this.state.imageData.map(imgDataObj => {
            return (
                <ImageCard key={imgDataObj.id} submitImage={(imgData: ImageItem) => {this.handleSubmit(imgData)}} props={imgDataObj}/>
            )
        });

        return (
            <div>
                {this.state.imageData ? imgThumbs : <div>
                    Loading...
                </div>}
            </div>
        );
    }
}
