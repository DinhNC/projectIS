Date.prototype.toStringMySQLFormat = function(withoutSecond)
{
    var str = ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + this.getUTCDate()).slice(-2) + ' ' + 
        ('00' + this.getUTCHours()).slice(-2) + ':' + 
        ('00' + this.getUTCMinutes()).slice(-2);

    if( !withoutSecond )
    {
        str += (':' + ('00' + this.getUTCSeconds()).slice(-2));
    }
    return str;
};

$(document).ready(function(){
    $('#updated_at_from, #updated_at_to').datetimepicker({
        timepicker:false,
        format:'Y-m-d',
        defaultTime: '00:00'
    });

    $('#apply-chart').click(function(event) {
        var updated_at = {
            from    : $('#updated_at_from').val(),
            to      : $('#updated_at_to').val()
        }
        var platform = $('#platform').val();

        $.get('solr-data-statistics/load-data',{
                updated_at : updated_at
            },
            function(result){
                var seriesArr       = [];
                var FB              = []; //Facebook Page/Group's post
                var FB_CM           = []; //Facebook Page/Group's comment
                var FB_USER         = []; //Facebook User's post
                var FB_USER_CM      = []; //Facebook User's comment
                var NEWS            = []; //News
                var NEWS_CM         = []; //News's comment
                var FORUM           = []; //Forum's thread
                var FORUM_CM        = []; //Forum Post
                var BLOG            = []; //Blog post
                var BLOG_CM         = []; //Blog comment
                var YT              = []; //YouTube's video
                var YT_CM           = []; //YouTube's comment
                var REVIEWS         = []; //Review
                var REVIEWS_CM      = []; //Review comment
                var ECOM            = []; //Ecom
                var ECOM_CM         = []; //Ecom comment

                switch(platform)
                {
                    case 'FACEBOOK':
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 1:
                                    FB.push([time, result[i].total_docs]);
                                    break;
                                case 2:
                                    FB_CM.push([time, result[i].total_docs]);
                                    break;
                                case 6:
                                    FB_USER.push([time, result[i].total_docs]);
                                    break;
                                case 12:
                                    FB_USER_CM.push([time, result[i].total_docs]);
                                    break;
                            }
                        }
                        var data_FB = {
                            name: "Fb P/G post",
                            data: FB
                        };
                        var data_FB_CM = {
                            name: "Fb P/G cm",
                            data: FB_CM
                        };
                        var data_FB_USER = {
                            name: "Fb User post",
                            data: FB_USER
                        };
                        var data_FB_USER_CM = {
                            name: "Fb User cm",
                            data: FB_USER_CM
                        };
                        seriesArr.push(data_FB);
                        seriesArr.push(data_FB_CM);
                        seriesArr.push(data_FB_USER);
                        seriesArr.push(data_FB_USER_CM);
                        break;
                    case 'NEWS':
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 3:
                                    NEWS.push([time, result[i].total_docs]);
                                    break;
                                case 7:
                                    NEWS_CM.push([time, result[i].total_docs]);
                                    break;
                            }
                        }
                        var data_NEWS = {
                            name: "News",
                            data: NEWS
                        };
                        var data_NEWS_CM = {
                            name: "News cm",
                            data: NEWS_CM
                        };
                        seriesArr.push(data_NEWS);
                        seriesArr.push(data_NEWS_CM);
                        break;
                    case 'FORUM':
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 4:
                                    FORUM.push([time, result[i].total_docs]);
                                    break;
                                case 8:
                                    FORUM_CM.push([time, result[i].total_docs]);
                                    break;
                            }
                        }
                        var data_FORUM   = {
                            name: "Forum Post",
                            data: FORUM
                        };
                        var data_FORUM_CM = {
                            name: "Forum thread",
                            data: FORUM_CM
                        };
                        seriesArr.push(data_FORUM);
                        seriesArr.push(data_FORUM_CM);
                        break;        
                    case 'BLOG':
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 5:
                                    BLOG.push([time, result[i].total_docs]);
                                    break;
                                case 11:
                                    BLOG_CM.push([time, result[i].total_docs]);
                                    break;
                            }
                        }
                        var data_BLOG    = {
                            name: "Blog",
                            data: BLOG
                        };
                        var data_BLOG_CM = {
                            name: "Blog cm",
                            data: BLOG_CM
                        };
                        seriesArr.push(data_BLOG);
                        seriesArr.push(data_BLOG_CM);
                        break;
                    case 'YOUTUBE':
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 9:
                                    YT.push([time, result[i].total_docs]);
                                    break;
                                case 10:
                                    YT_CM.push([time, result[i].total_docs]);
                                    break;
                            }
                        }
                        var data_YT    = {
                            name: "YouTube",
                            data: YT
                        };
                        var data_YT_CM = {
                            name: "YouTube cm",
                            data: YT_CM
                        };
                        seriesArr.push(data_YT);
                        seriesArr.push(data_YT_CM);
                        break;
                    case 'REVIEWS':
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 9:
                                    REVIEWS.push([time, result[i].total_docs]);
                                    break;
                                case 10:
                                    REVIEWS_CM.push([time, result[i].total_docs]);
                                    break;
                            }
                        }
                        var data_REVIEWS      = {
                            name: "Review",
                            data: REVIEWS
                        };
                        var data_REVIEWS_CM   = {
                            name: "Review cm",
                            data: REVIEWS_CM
                        };
                        seriesArr.push(data_REVIEWS);
                        seriesArr.push(data_REVIEWS_CM);
                        break;
                    case 'ECOM':
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 15:
                                    ECOM.push([time, result[i].total_docs]);
                                    break;
                                case 16:
                                    ECOM_CM.push([time, result[i].total_docs]);
                                    break;
                            }
                        }
                        var data_ECOM      = {
                            name: "Ecom",
                            data: ECOM
                        };
                        var data_ECOM_CM   = {
                            name: "Ecom cm",
                            data: ECOM_CM
                        };
                        seriesArr.push(data_ECOM);
                        seriesArr.push(data_ECOM_CM);
                        break;
                    default:
                        for(var i=0; i<result.length; i++)
                        {
                            var time = new Date(result[i].updated_at).toStringMySQLFormat(true);
                            switch(result[i].id_table)
                            {
                                case 1:
                                    FB.push([time, result[i].total_docs]);
                                    break;
                                case 2:
                                    FB_CM.push([time, result[i].total_docs]);
                                    break;
                                case 6:
                                    FB_USER.push([time, result[i].total_docs]);
                                    break;        
                                case 12:
                                    FB_USER_CM.push([time, result[i].total_docs]);
                                    break;
                                case 3:
                                    NEWS.push([time, result[i].total_docs]);
                                    break;
                                case 7:
                                    NEWS_CM.push([time, result[i].total_docs]);
                                    break;
                                case 4:
                                    FORUM.push([time, result[i].total_docs]);
                                    break;
                                case 8:
                                    FORUM_CM.push([time, result[i].total_docs]);
                                    break;
                                case 5:
                                    BLOG.push([time, result[i].total_docs]);
                                    break;  
                                case 11:
                                    BLOG_CM.push([time, result[i].total_docs]);
                                    break;
                                case 9:
                                    YT.push([time, result[i].total_docs]);
                                    break;  
                                case 10:
                                    YT_CM.push([time, result[i].total_docs]);
                                    break;
                                case 13:
                                    REVIEWS.push([time, result[i].total_docs]);
                                    break;  
                                case 14:
                                    REVIEWS_CM.push([time, result[i].total_docs]);
                                    break; 
                                case 15:
                                    ECOM.push([time, result[i].total_docs]);
                                    break;  
                                case 16:
                                    ECOM_CM.push([time, result[i].total_docs]);
                                    break;                                 
                            }
                        }
                        var data_FB         = {name: "Fb P/G post", data: FB};
                        var data_FB_CM      = {name: "Fb P/G cm", data: FB_CM};
                        var data_FB_USER    = {name: "Fb User post", data: FB_USER};
                        var data_FB_USER_CM = {name: "Fb User cm", data: FB_USER_CM};
                        var data_NEWS       = {name: "News", data: NEWS};
                        var data_NEWS_CM    = {name: "News cm", data: NEWS_CM};
                        var data_FORUM      = {name: "Forum Post", data: FORUM};
                        var data_FORUM_CM   = {name: "Forum thread", data: FORUM_CM};
                        var data_BLOG       = {name: "Blog", data: BLOG};
                        var data_BLOG_CM    = {name: "Blog cm", data: BLOG_CM};
                        var data_YT         = {name: "YT", data: YT};
                        var data_YT_CM      = {name: "YT cm", data: YT_CM};
                        var data_REVIEWS    = {name: "Review", data: REVIEWS};
                        var data_REVIEWS_CM = {name: "Review cm", data: REVIEWS_CM};
                        var data_ECOM       = {name: "Ecom", data: ECOM};
                        var data_ECOM_CM    = {name: "Ecom cm", data: ECOM_CM};

                        seriesArr.push(data_FB);
                        seriesArr.push(data_FB_CM);
                        seriesArr.push(data_FB_USER);
                        seriesArr.push(data_FB_USER_CM);
                        seriesArr.push(data_NEWS);
                        seriesArr.push(data_NEWS_CM);
                        seriesArr.push(data_FORUM);
                        seriesArr.push(data_FORUM_CM);
                        seriesArr.push(data_YT);
                        seriesArr.push(data_YT_CM);
                        seriesArr.push(data_REVIEWS);
                        seriesArr.push(data_REVIEWS_CM);
                        seriesArr.push(data_ECOM);
                        seriesArr.push(data_ECOM_CM);
                        break;
                }
                chart(seriesArr);
            });
        });
    });

function chart(chartData) {
    $('#solr-master-chart').highcharts({
        chart: {
            type: 'line'
        },
        credits: {
            enabled:false
        },
        title: {
            text: ''
        },
        "chart": {
            "renderTo": "cht",
                "events": {
                "load": function (event) {
                    var seriesData = this.series[0].data;
                    var tCategories = [];
                    for (i = 0; i < seriesData.length; i++) {
                        tCategories.push(seriesData[i].name);
                    }
                    this.xAxis[0].setCategories(tCategories);
                }
            }
        },
        xAxis: {
            min: 0
        },
        yAxis: {
            title: {
                text: 'Number of data'
            },
            min: 0
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: chartData
    });
};
