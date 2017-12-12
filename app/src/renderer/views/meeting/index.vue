<template>
  <div class="meeting">
    <video autoplay ref='localStream' width="600" muted=""></video>
    <video v-for='item in participants' autoplay ref='remoteStream' width="600" class="remote"></video>
  </div>
</template>
<script>
import wilddog from 'wilddog';
import * as base from 'wilddog-video-base'
const wilddogVideo = base.wilddogVideo
import roomFactory from 'wilddog-video-room';
wilddogVideo.regService('room', roomFactory);
// console.log(wilddogVideo)

export default {
  name: 'meeting',
  data() {
    return {
      title: 'meeting',
      localStream: null,
      localEl: null,
      syncConfig: {
        authDomain: 'wildrtc.wilddog.com'
      },
      videoInstance: null,
      participants: [],
      roomId: null
    }
  },
  created() {
    wilddog.initializeApp(this.syncConfig);
    this.roomId = this.$route.query.room
    
  },
  mounted() {
    const vm = this;
    wilddog.auth().signInAnonymously()
      .then(user => {
        wilddogVideo.initialize({ appId: 'wildrtc', token: user.getToken() });
        wilddogVideo.createLocalStream({
          captureVideo: true,
          captureAudio: true,
          dimension: '720p',
          maxFPS: 15
        }).then(wdStream => {
          this.localStream = wdStream;
          this.localStream.attach(this.$refs.localStream)
          console.log(wilddogVideo.room(this.roomId))
          this.videoInstance = wilddogVideo.room(this.roomId);
          this.videoInstance.connect();
          this.join(this.roomId)
        })

      }).catch(error => {
        console.log(error);
      });
  },
  methods: {
    join(id) {
      const _self = this
      _self.localEl = this.$refs.localStream
      _self.videoInstance.on('connected', function() {
        _self.videoInstance.publish(_self.localStream, function(error) {
          if (error == null) {
            _self.localStream.attach(_self.localEl);
          }
        });

        _self.videoInstance.on('stream_added', function(stream) {
          _self.videoInstance.subscribe(stream, function(error) {
            if (error == null) {}
          })
        })

        _self.videoInstance.on('stream_received', function(stream) {
          _self.addStream(stream);
        });


        _self.videoInstance.on('stream_removed', function(stream) {
          _self.removeStream(stream)
        });

      })

      window.addEventListener("beforeunload", function(e) {
        _self.videoInstance.disconnect();
      });
    },

    addStream(stream) {
      this.participants.push(stream);
      this.displayStreams(this.participants);
    },

    removeStream(stream) {
      let vm = this
      vm.participants.forEach(function(element, index) {
        if (element.constrains.streamId == stream.streamId) {
          vm.participants.splice(index, 1);
          vm.displayStreams(vm.participants);
        }

      });
    },

    displayStreams(participants) {
      const vm = this
      console.log(participants.length)
      for (let i = 0; i < participants.length; i++) {
        vm.$nextTick(function() {
          vm.participants[i].attach(this.$refs.remoteStream[i])
        })
      }
    }

  }
}

</script>
<style rel="stylesheet/scss" lang="scss">


</style>
