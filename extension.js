console = chrome.extension.getBackgroundPage().console;
jQuery(document).ready(function () {
  setInterval(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      console.log(activeTab.audible);
      // Listen for changes to the pause status of the video
      let deviceId;
      let token =
        "BQCGXHa6s8AhcGnKdbJRtesZedVI_DbQe4MxiZJRh4lHkX9hChRqC-qQJQKnByyOdfP5wPefRnA-PFs0DENQx0bLVw-3HIxOwT0ualiB1L7OFmfH1zaPCq8jW9sEnbN-YpoVhaod2aWFb30js9tlSdDrJpsPihv1XHd63u28kOkYB0sjamIdExYysBB02FLBsUUGPUozvfcHZEwwxvsHmJoK8Th3dxuuWulO_UrbMo8P3TYmIoXPi86IatgQzuPP8oSj9ItM3a5FTnz8_F05uZClgmmzulD0tg9JdpJC-Yb19S3Pz87v_xGQ29qm";
      jQuery.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/me/player/devices",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        success: function (data) {
          let deviceId = data.devices[0].id;
          console.log(data);
          if (activeTab.audible == false) {
            jQuery.ajax({
              type: "PUT",
              url:
                "https://api.spotify.com/v1/me/player/play?device_id=" +
                deviceId,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              success: function (data) {
                console.log(data);
              },

              error: function (error) {
                console.log(error);
              },
            });
          }
          if (activeTab.audible == true) {
            jQuery.ajax({
              type: "PUT",
              url:
                "https://api.spotify.com/v1/me/player/pause?device_id=" +
                deviceId,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                  "Bearer BQDqIyGEJYoFtPJAXt4wpZp59i5JyjbQO9gmLPXmoCOtbG4HsI8rRYDx9nXQRuW3lDC6BZEig15ezKg0IPMq45DzAL_rLO5JMCQ8ssO8I_ay0tWAdlBP6l4BMUPcZav0v3-VrgikdTtlrSHn0_lIrOCYqjTUI6wch8A8MC5LEk9864h5rzKNsVzBcI1Ix3zRb8BX4YM",
              },
              success: function (data) {
                console.log(data);
              },
              error: function (error) {
                console.log(error);
              },
            });
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  }, 1000);
});
