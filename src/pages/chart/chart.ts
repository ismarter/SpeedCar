import {Component, ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import {NavController, Slides, Content, Platform} from 'ionic-angular';
import echarts from 'echarts';
import {Http} from "@angular/http";
/*
 Generated class for the Chart page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-chart',
    templateUrl: 'chart.html'
})
export class ChartPage {


    @ViewChild('ECHARTS') echartsElement: ElementRef;

    @ViewChild('dateSlider') dateSlider: Slides;

    @ViewChild('content') content: Content;

    dateList: Array<string> = [];

    private echarts: any = null;

    buttonDateBackDisabled: boolean = false;

    buttonDateForwardDisabled: boolean = true;

    constructor(public platform: Platform, public navCtrl: NavController, private  viewContainerRef: ViewContainerRef, http: Http) {
        let nowDate = new Date();
        this.dateList.unshift(nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1));
        for (let i = 0; i < 24; i++) {
            nowDate.setMonth(nowDate.getMonth() - 1);
            this.dateList.unshift(nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1));
        }

    }

    ionViewDidLoad() {
        console.log('Hello EchartsPage Page');

        this.content.addScrollListener(($event) => {
            console.log($event);
        })

        this.content.addTouchEndListener(($event) => {
            setTimeout(() => {
                let scrollTop = this.content.getContentDimensions().scrollTop;
                let echartsElementHight = this.echartsElement.nativeElement.getBoundingClientRect().height;
                if (scrollTop < echartsElementHight / 2) {
                    console.log("scrollToTop")
                    this.content.scrollTo(0, 0, 300);
                } else {
                    console.log("scrollToBottom")
                    this.content.scrollTo(0, echartsElementHight, 300);
                }
            }, 500)

        });
    }

    ionViewWillEnter() {
        let element = this.echartsElement.nativeElement;
        element.addEventListener("touchstart", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
        element.addEventListener("touchmove", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
        element.addEventListener("touchend", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
        element.addEventListener("touchcancel", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
    }

    ionViewDidEnter() {
        console.log(this.echartsElement);
        console.log(this.viewContainerRef);
        console.log(echarts);

        this.echarts = echarts.init(this.echartsElement.nativeElement);

        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'top',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.echarts.setOption(option);
    }


    buttonDateBack($event) {
        this.dateSlider.slidePrev(300, true);
    }


    buttonDateForward($event) {
        this.dateSlider.slideNext(300, true);
    }


    ionWillChange($event) {
        console.log($event);
        if ($event.activeIndex == this.dateList.length - 1) {
            this.buttonDateForwardDisabled = true;
        } else {
            this.buttonDateForwardDisabled = false;
        }

        if ($event.activeIndex == 0) {
            this.buttonDateBackDisabled = true;
        } else {
            this.buttonDateBackDisabled = false;
        }
    }

    ionDidChange($event) {
        console.log($event);
    }

    slideScroll($event) {
        let scrollTop = this.content.getContentDimensions().scrollTop;
        let echartsElementHight = this.echartsElement.nativeElement.getBoundingClientRect().height;
        if (scrollTop > echartsElementHight / 2) {
            this.content.scrollTo(0, 0, 300);
        } else {
            this.content.scrollTo(0, echartsElementHight, 300);
        }
    }

    contentSwipe($event) {
        console.log($event)
    }

}
