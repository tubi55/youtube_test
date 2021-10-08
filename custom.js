$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType : 'jsonp',
    data :{
        part : "snippet", 
        key : "AIzaSyCbARLbftvbPSX5cjABTy1LZpet3RVkrh4", 
        maxResults : 5, 
        playlistId : "PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd"
    }
})
.success(function(data){
   // console.log(data); 

    let items = data.items; 
    console.log(items); 

    //영상 갯수만큼 반복
    $(items).each(function(index, data){
        
        //본문 텍스트 내용이 200글자를 넘어가면 말줄임표 붙이기 
        let txt = data.snippet.description; 
        let len = txt.length; 
        if(len>200){
            txt = txt.substr(0, 200) + "..."
        } 

        //날짜 텍스트 정리 
        let date = data.snippet.publishedAt; 
        date = date.split("T")[0]; 
        //console.log(date);  

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
                                    $("<p>").text(txt),
                                    $("<span>").text(date)
                                )
                    )
            )
    });
})
.error(function(err){
    console.error(err); 
})