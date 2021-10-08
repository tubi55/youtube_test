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
   // console.log(data); 

    let items = data.items; 
    console.log(items); 

    //영상 갯수만큼 반복
    $(items).each(function(index, data){

         

        $("#vidGallery")
            .append(
                $("<article>")
                    .append(
                        $("<a>").attr({ href : data.snippet.resourceId.videoId })
                                .append(
                                    $("<img>").attr({ src : data.snippet.thumbnails.high.url })
                                ),
                        $("<div class='con'>")
                                .append(
                                    $("<h2>").text(data.snippet.title),
                                    $("<p>").text(data.snippet.description),
                                    $("<span>").text(data.snippet.publishedAt)
                                )
                    )
            )
    });
})
.error(function(err){
    console.error(err); 
})