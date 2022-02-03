import * as React from "react"
import { Link } from "gatsby"


import ReactPlayer from 'react-player'


import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { PropTypes } from 'prop-types';


// import video3 from "../video/video3.webm"
// import video4 from "../video/video4.webm"
// import video5 from "../video/video5.webm"
// import video6 from "../video/video6.webm"
// import video7 from "../video/video7.webm"
// import video8 from "../video/video8.webm"
// import video9 from "../video/video9.webm"
// import video10 from "../video/video10.webm"
// import video11 from "../video/video11.webm"
// import video12 from "../video/video12.webm"
// import video13 from "../video/video13.webm"
// import video14 from "../video/video14.webm"
// import video15 from "../video/video15.webm"
// import video16 from "../video/video16.webm"
// import video17 from "../video/video17.webm"
// import video18 from "../video/video18.webm"
// import video19 from "../video/video19.webm"
// import video20 from "../video/video20.webm"
// import video21 from "../video/video21.webm"
// import video22 from "../video/video22.webm"

const DUMMY_VIDEOS = [

  {
    _id: '',
    videoUrl: "https://www.youtube.com/embed/AVn-Yjr7kDc"
  },
  {
    _id: '',
    videoUrl: "https://www.youtube.com/embed/mOdmi9SVeWY"
  },
  // {
  //   _id: '',
  //   videoUrl: video5
  // },
  // {
  //   _id: '',
  //   videoUrl: video6
  // },
  // {
  //   _id: '',
  //   videoUrl: video7
  // },
  // {
  //   _id: '',
  //   videoUrl: video8
  // },
  // {
  //   _id: '',
  //   videoUrl: video9
  // },
  // {
  //   _id: '',
  //   videoUrl: video10
  // },
  // {
  //   _id: '',
  //   videoUrl: video11
  // },
  // {
  //   _id: '',
  //   videoUrl: video12
  // },
  // {
  //   _id: '',
  //   videoUrl: video13
  // },
  // {
  //   _id: '',
  //   videoUrl: video14
  // },
  // {
  //   _id: '',
  //   videoUrl: video15
  // },
  // {
  //   _id: '',
  //   videoUrl: video16
  // },
  // {
  //   _id: '',
  //   videoUrl: video17
  // },
  // {
  //   _id: '',
  //   videoUrl: video18
  // },
  // {
  //   _id: '',
  //   videoUrl: video19
  // },
  // {
  //   _id: '',
  //   videoUrl: video20
  // },
  // {
  //   _id: '',
  //   videoUrl: video21
  // },
  // {
  //   _id: '',
  //   videoUrl: video22
  // },
  // {
  //   _id: '',
  //   videoUrl: video23
  // },
]




const YoutubeSlide = ({ url, isSelected }) => {
  console.log(isSelected)
  return (
    <ReactPlayer width="100%" height="276px" url={url} playing={isSelected} />

  )
}



const UsingSSR = ({ data }) => {

  const customRenderItem = (item, props) => (
    <item.type {...item.props} {...props} />
  );

  const getVideoThumb = (i) => `../video/video${i}.mp4`;

  const getVideoId = url => url.substr('https://www.youtube.com/watch?v='.length, url.length);

  const customRenderThumb = children =>
    children.map(item => {
      const videoId = getVideoId(item.props.url);

      return <img key={videoId} src={getVideoThumb(videoId)} />;
    });

  return (

    <>
      <p>{ }</p>

      <Carousel
        autoPlay={true}

        emulateTouch={true}
        showArrows={true}
        showThumbs={true}
        interval={5000}
        showStatus={true}
        infiniteLoop={true}
        renderItem={customRenderItem}

      >
        {data.map((v, i) => (
          <YoutubeSlide
            url={v.videoUrl}

            controls={true}
            muted={false}

            key={v._id ? v._id : v.id}
          />
        ))}
      </Carousel>
    </>
  );
};

YoutubeSlide.propTypes = {
  url: PropTypes.string,
  isSelected: PropTypes.bool
};

UsingSSR.propTypes = {
  data: PropTypes.array
};

UsingSSR.defaultProps = {
  data: DUMMY_VIDEOS
};
export default UsingSSR

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
