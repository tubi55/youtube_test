$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType : 'jsonp',
    data :{
        part : "snippet", 
        key : "AIzaSyCbARLbftvbPSX5cjABTy1LZpet3RVkrh4", 
        maxResults : 5, 
        playlistId : "PLYOPkdUKSFgUwLVFuHcpMY2tXYdTJ68dT"
    }
})
.success(function(data){
    console.log(data); 
})
.error(function(err){
    console.error(err); 
})