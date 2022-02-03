
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./style.css"
/* eslint-env browser */
import React, { useState } from 'react';

import Modal from "react-modal";
import ReactPlayer from 'react-player'





import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { PropTypes } from 'prop-types';



const videoType = 'video/webm';




export default class SecondPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      recording: false,
      videos: [],
      nums: 0,
      modalIsOpen: false,
      myVideo: [],
      v_arr: [],
      viddd: [],
      play: true

    };

  }


  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    // show it to user
    this.video.srcObject = stream;
    this.video.play();
    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
    const data = localStorage.getItem("myNum")
    this.setState({ nums: data })
    // const json = localStorage.getItem("viddd")
    // let array = JSON.parse(json);
    // this.setState({ videos: array })




  }
  componentWillUnmount() {
    const data = localStorage.getItem("myNum")
    this.setState({ nums: data })
  }

  // setNum() {
  //   let array = this.state.videos
  //   let json = JSON.stringify(array, undefined, 1);
  //   localStorage.setItem("myNum", this.state.nums);

  //   localStorage.setItem("viddd", json)

  // }
  startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });


  }

  stopRecording(e) {


    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({
      recording: false,
      nums: Number(this.state.nums) + 1
    });



    this.saveVideo();
    // let array = this.state.videos
    // let json = JSON.stringify(array, undefined, 1);
    localStorage.setItem("myNum", this.state.nums);

    // localStorage.setItem("viddd", json)



  }

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const videos = this.state.videos.concat([videoURL]);
    this.setState({ videos });

  }



  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    const videos = this.state.videos.filter(v => v !== videoURL);
    this.setState({ videos });
  }






  customRenderItem(item, props) {
    return (
      <item.type {...item.props} {...props} />
    )
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    })

  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }


  YoutubeSlide({ url, isSelected }) {
    console.log(isSelected)
    return (
      <>
        <ReactPlayer width="100%" height="276px" url={url} playing={isSelected}
        />
      </>

    )
  }



  render() {
    const { recording, videos, modalIsOpen } = this.state;


    return (

      <div className="main-page">
        <div className="camera">
          <video

            ref={v => {
              this.video = v;
            }}>
            Video stream not available.
          </video>

        </div >

        <div className="left-control">
          <div className="button">
            {!recording && <div className="button-start" onClick={(e) => this.startRecording(e)}></div>}
            {recording && <div className="button-stop" onClick={(e) => this.stopRecording(e)}></div>}
          </div>




        </div>

        <div className="modal_btn">

          <div className="modal-open" onClick={() => this.openModal()}></div>


        </div>



        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={() => this.closeModal}
          style={{
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
          }}
          contentLabel="Example Modal"
        >
          <div className="exit" onClick={() => this.closeModal()}>.</div>


          <div className="slide-show">
            <Carousel
              autoPlay={true}

              emulateTouch={true}
              showArrows={true}
              showThumbs={true}
              interval={5000}
              showStatus={false}
              infiniteLoop={true}
              renderItem={this.customRenderItem}

            >

              {videos.map((videoURL, i) => (
                <div className="modal-inside">
                  <p>{i + 1}<span>人目</span></p>
                  <this.YoutubeSlide

                    url={videoURL}

                    muted
                    controls={true}


                    key={videoURL._id ? videoURL._id : videoURL.id}
                  />

                </div>
              ))}

            </Carousel>
          </div>
        </Modal>




      </div>
    );
  }

}



SecondPage.propTypes = {
  url: PropTypes.string,
  isSelected: PropTypes.bool
};