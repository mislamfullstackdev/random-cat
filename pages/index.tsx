import { GetServerSideProps, NextPage} from 'next'
import { useState } from 'react';

// Type of props passed from getServerSideProps

type Props = {
    initialImageUrl:  string
}


const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url)
    //         setLoading(false)
    //     });
    // }, []);
    const handleClick =  async () =>{
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url)
        setLoading(false)
    }
    return (
        <div>
            <button onClick={handleClick}>Click Me To Get New Cat</button>
            <div>{loading || <img src={imageUrl} style={{ width: '60%', height: '45%' }} />}</div>
        </div>
    )
};

export default IndexPage;

// Server side rendering

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

type Image = {
    url: string;
}

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    // console.log(images);
    return images[0];
};
