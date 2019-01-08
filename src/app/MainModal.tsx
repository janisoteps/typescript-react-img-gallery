import * as React from 'react';
import ImageCard from './ImageCard';
import SearchBox from './SearchBox';
import Spinner from './Spinner';

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
        // http://10.10.21.129:9903
        const hostName = 'http://hackman.zmags.com:9903';
        const searchSlug = searchTerm ? searchTerm.length > 0 ? `&search=${searchTerm}` : '' : '';
        console.log(`http://hackman.zmags.com:9903/v1/products?cid=${cid}${searchSlug}`);
        let response = await fetch(
            `${hostName}/v1/products?cid=${cid}${searchSlug}`,
            {
                method: 'get'
            });

        return await response.json();
    }
}

export class MainModal extends React.Component<any, State> {
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
        this.setState({
            ...this.state,
            imageData: null
        });
        const getImgData = new GetImageData();
        const companyId = this.state.companyId ? this.state.companyId : '5ab004e746e0fb000c52f5bf';
        getImgData.getData(companyId, searchString).then((data) => {
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
            ? JSON.parse(window.localStorage.ajs_user_traits).companyId : '5ab004e746e0fb000c52f5bf';

        getImgData.getData(companyId, '').then((data) => {
            console.log(data);
            if (data.length > 200) {
                data = data.slice(0, 200)
            }
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
                        <Spinner/>
                    </div>}
                </div>
            </div>
        );
    }
}
