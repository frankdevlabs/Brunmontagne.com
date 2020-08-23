import React from "react"

class TV extends React.PureComponent {
  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded

    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo

      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      // If script is already there, load the video directly
      this.loadVideo()
    }
  }

  loadVideo = () => {
    let w = document.getElementsByClassName("header")[0].offsetWidth
    let h = document.getElementsByClassName("header")[0].offsetHeight + 200

    const playerDefaults = {
      autoplay: 1,
      autohide: 1,
      loop: 1,
      modestbranding: 0,
      rel: 0,
      controls: 0,
      disablekb: 1,
      enablejsapi: 0,
      iv_load_policy: 3,
      showinfo: 0,
    }

    this.tv = new window.YT.Player("tv", {
      host: window.location.protocol + "//www.youtube.com",
      videoId: "9ZxqsDrjyZc",
      width: w,
      height: h,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
      playerVars: playerDefaults,
    })

    window.addEventListener("load", this.vidRescale)
    window.addEventListener("resize", this.vidRescale)
  }

  onPlayerReady = event => {
    this.tv.mute()
    event.target.playVideo()
  }

  onPlayerStateChange = event => {
    if (event.data === window.YT.PlayerState.ENDED) {
      this.tv.playVideo()
    }
  }

  vidRescale = () => {
    let w = document.getElementsByClassName("header")[0].offsetWidth
    let h = document.getElementsByClassName("header")[0].offsetHeight + 200

    var screen = document.querySelector("#tv.screen")
    if (w / h > 16 / 9) {
      this.tv.setSize(w, (w / 16) * 9)
      screen.style.left = "0px"
    } else {
      this.tv.setSize((h / 9) * 16, h)
    }
  }

  render = () => {
    return (
      <div className="header__tv">
        <div className="screen mute" id="tv"></div>
      </div>
    )
  }
}

export default TV
