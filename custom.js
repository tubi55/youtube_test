function Youtube(option){
    this.init(option); 
    this.bindingEvent();
}
Youtube.prototype.init = function(option){
    if(option.frame == undefined) {
        console.error("프레임은 필수 입력값입니다.");
        return;
    }
    if(option.key == undefined) {
        console.error("키값은 필수 입력값입니다.");
        return;
    }
    if(option.playList == undefined) {
        option.playList = "PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd";
    }
    if(option.num == undefined) {
        option.num = 2;
    }

    this.selector = option.frame;
    this.playlist = option.playList;
    this.key = option.key;
    this.num = option.num;
}
Youtube.prototype.bindingEvent = function(){  
    this.getYoutube();
   
    $("body").on("click", this.selector+" article a", function(e){
        e.preventDefault(); 
        this.createPop(e.currentTarget);
    }.bind(this));
   
    $("body").on("click", this.selector+" article h2", function(e){
        this.createPop(e.currentTarget);
    }.bind(this));
   
    $("body").on("click", ".pop span", function(){
        $(".pop").remove(); 
    });
}
Youtube.prototype.getYoutube = function(){  
    $.ajax({
        url:"https://www.googleapis.com/youtube/v3/playlistItems",
        dataType : 'jsonp',
        data :{
            part : "snippet", 
            key : this.key, 
            maxResults : this.num, 
            playlistId : this.playlist
        }
    })
    .success(function(data){   
        let items = data.items;  

        $(items).each(function(_, data){
            let txt = data.snippet.description; 
            let len = txt.length; 
            if(len>200) txt = txt.substr(0, 200) + "...";
            
            let date = data.snippet.publishedAt; 
            date = date.split("T")[0]; 
      
    
            $(this.selector)
                .append(
                    $("<article>")
                        .append(
                            $("<a>").attr({ href : data.snippet.resourceId.videoId })
                                    .append(
                                        $("<img>").attr({ src : data.snippet.thumbnails.high.url })
                                    ),
                            $("<div class='con'>")
                                    .append(
                                        $("<h2>")
                                            .text(data.snippet.title)
                                            .attr({href : data.snippet.resourceId.videoId })
                                        ,
                                        $("<p>").text(txt),
                                        $("<span>").text(date)
                                    )
                        )
                )
        }.bind(this)); //each문 this 고정
    }.bind(this)) //ajax문 고정
    .error(function(err){
        console.error(err); 
    });
}
Youtube.prototype.createPop = function(item){
    let vidId = $(item).attr("href"); 

    $("body")
        .append(
            $("<div class='pop'>")
                .append(
                    $("<iframe>")
                        .attr({
                            src : "https://www.youtube.com/embed/"+vidId,
                            frameborder : 0   ,
                            allowfullscreen : true                         
                        }), 
                    $("<span>").text("close")
                )
        )
}






