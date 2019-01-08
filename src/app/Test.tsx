import * as React from 'react';
import ImageCard from './ImageCard';
import SearchBox from './SearchBox';

interface ImageItem {
    id: number;
    itemGroupId: string;
    title: string;
    description: string;
    imageLink: string;
    availability: string;
}

interface ImageItems extends Array<ImageItem>{}

interface State {
    imageData: ImageItems | null;
    companyId: string | null;
    filter: string;
}

class GetImageData {
    async getData(cid: string, searchTerm: string) {
        console.log(`cid: ${cid}, searchTerm: ${searchTerm}`);
        // http://localhost:9903/v1/products?cid=5af1da5746e0fb000ca0c357&search=T2
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
            companyId: null,
            filter: 'all'
        };
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    handleImageSubmit (imgData: ImageItem) {
        const id = imgData.id;
        const itemGroupId = imgData.itemGroupId;
        const imageLink = imgData.imageLink;
        const title = imgData.title;
        const description = imgData.description;

        console.log(` id: ${id} \n itemGroupId: ${itemGroupId}, \n imageLink: ${imageLink}`
                    + `\n title: ${title} \n description: ${description}`);
    }

    submitSearch (searchString: string) {
        console.log(searchString);
        const getImgData = new GetImageData();

        getImgData.getData(this.state.companyId, searchString).then((data) => {
            this.setState({
                ...this.state,
                imageData: data
            });
        });
    }

    changeFilter(filter: string) {
        console.log(`filter: ${filter}`);
        this.setState({
            ...this.state,
            filter: filter
        });
    }

    componentDidMount () {
        const getImgData = new GetImageData();
        const companyId = window.localStorage.ajs_user_traits
            ? JSON.parse(window.localStorage.ajs_user_traits).companyId : '';

        getImgData.getData(companyId, '').then((data) => {
            // console.log(data);
            this.setState({
                ...this.state,
                imageData: data,
                companyId: companyId
            });
        });
    }

    render(): JSX.Element {

        const imgThumbs = this.state.imageData && this.state.imageData.map(imgDataObj => {
            if (this.state.filter === 'all' || this.state.filter === imgDataObj.availability) {
                return (
                    <ImageCard
                        key={imgDataObj.id}
                        submitImage={(imgData: ImageItem) => {
                            this.handleImageSubmit(imgData)
                        }}
                        props={imgDataObj}
                    />
                )
            }
        });

        return (
            <div>
                <SearchBox
                    submitSearch={(searchString: string) => {this.submitSearch(searchString)}}
                    changeFilter={(filter: string) => {this.changeFilter(filter)}}
                />
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: "flex-end"
                }}>
                    {this.state.imageData ? imgThumbs : <div>
                        Loading...
                    </div>}
                </div>
            </div>
        );
    }
}
