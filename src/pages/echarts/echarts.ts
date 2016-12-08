import {Component, ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import {NavController, Slides, Content, Platform} from 'ionic-angular';
import echarts from 'echarts';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {DecimalPipe} from "@angular/common";


const BILL_VIEW_MAPPING = {
    eating: {
        name: '餐饮',
        icon: 'ios-pizza',
        style: {color: '#32db64'},
        dateKey: 'eatingDate',
        addressKey: null,
        deleteKey: 'eatingNodeId',
        templateFunc: (billData) => {
            return `${billData.company} ${billData.personNum}人`;
        },
        chartColor: '#2aafef'
    },
    buy: {
        name: '收款',
        icon: 'logo-yen',
        style: {color: 'blueviolet'},
        dateKey: 'buyDate',
        addressKey: null,
        deleteKey: 'buyNodeId',
        templateFunc: (billData) => {
            return `${billData.buyWay}-${billData.buyee}`;
        },
        chartColor: '#f8347b'
    },
    travel: {
        name: '出行',
        icon: 'ios-car',
        style: {color: '#f53d3d'},
        dateKey: 'travelDate',
        addressKey: 'fromCity',
        deleteKey: 'travelNodeId',
        templateFunc: (billData) => {
            return `${billData.fromCity}－${billData.toCity}`;
        },
        chartColor: '#ffbb2f'
    },
    sale: {
        name: '销售',
        icon: 'ios-cart',
        style: {color: '#387ef5'},
        dateKey: 'saleDate',
        addressKey: null,
        deleteKey: 'saleNodeId',
        templateFunc: (billData) => {
            return `${billData.materiel}`;
        },
        chartColor: '#ff3863'
    },
    hotel: {
        name: '住宿',
        icon: 'ios-home',
        style: {color: '#387ef5'},
        dateKey: 'startDate',
        addressKey: 'hotel',
        deleteKey: 'hotelNodeId',
        templateFunc: (billData) => {
            return `${billData.hotel}`;
        },
        chartColor: '#28dccf'
    },
    pay: {
        name: '付款',
        icon: 'logo-yen',
        style: {color: 'orange'},
        dateKey: 'payDate',
        addressKey: null,
        deleteKey: 'payNodeId',
        templateFunc: (billData) => {
            return `${billData.payWay}-${billData.payee}`;
        },
        chartColor: '#79d079'
    },
    gather: {
        name: '采购',
        icon: 'ios-basket',
        style: {color: '#03c0ff'},
        dateKey: 'gatherDate',
        addressKey: null,
        deleteKey: 'gatherNodeId',
        templateFunc: (billData) => {
            return `${billData.materiel}`;
        },
        chartColor: '#96e138'
    },
    communicate: {
        name: '通讯',
        icon: 'ios-phone-portrait',
        style: {color: '#387ef5'},
        dateKey: 'communicateDate',
        addressKey: null,
        deleteKey: 'communicateNodeId',
        templateFunc: (billData) => {
            return `${billData.phoneNumber}`;
        },
        chartColor: '#bd3bbb'
    },
    other: {
        name: '其他',
        icon: 'ios-keypad',
        style: {color: '#03c0ff'},
        dateKey: 'otherDate',
        addressKey: null,
        deleteKey: 'otherNodeId',
        templateFunc: (billData) => {
            return `${billData.note || billData.invoicenum}`;
        },
        chartColor: '#6ccbe4'
    }
};

/*
 Generated class for the Echarts page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-echarts',
    templateUrl: 'echarts.html'
})
export class EchartsPage {

    @ViewChild('ECHARTS') echartsElement: ElementRef;

    @ViewChild('dateSlider') dateSlider: Slides;

    @ViewChild('content') content: Content;

    chartsInstance: any;

    dateList: Array<string> = [];

    dataListObject: any = {};

    buttonDateBackDisabled: boolean = false;

    buttonDateForwardDisabled: boolean = true;

    constructor(public platform: Platform, public navCtrl: NavController, private  viewContainerRef: ViewContainerRef, public http: Http) {
        let nowDate = new Date();
        this.dateList.unshift(nowDate.getFullYear() + "" + (nowDate.getMonth() + 1));
        for (let i = 0; i < 24; i++) {
            nowDate.setMonth(nowDate.getMonth() - 1);
            this.dateList.unshift(nowDate.getFullYear() + "" + (nowDate.getMonth() + 1));
        }

    }

    ionViewDidLoad() {

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
            }, 300)
        });
    }

    ionViewWillEnter() {

        this.echartsElement.nativeElement.addEventListener("touchstart", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
        this.echartsElement.nativeElement.addEventListener("touchmove", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
        this.echartsElement.nativeElement.addEventListener("touchend", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
        this.echartsElement.nativeElement.addEventListener("touchcancel", function (event) {
            event.stopPropagation();
            event.preventDefault();
        })
    }

    ionViewDidEnter() {
        this.chartsInstance = echarts.init(this.echartsElement.nativeElement);

        this.chartsInstance.on('click', function (params) {
            console.log("click")
            console.log(params);
        });

        this.chartsInstance.on('pieselectchanged', function (params) {
            console.log("pieselectchanged")
            console.log(params);
        });

        this.chartsInstance.on('globalout', function (params) {
            console.log("globalout")
            console.log(params);
        });

        this.chartsInstance.on('brushSelected', function (params) {
            console.log("brushSelected")
            console.log(params);
        });

    }


    buttonDateBack($event) {
        this.dateSlider.slidePrev(300, true);
    }


    buttonDateForward($event) {
        this.dateSlider.slideNext(300, true);
    }


    ionWillChange($event) {
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
        let date = this.dateList[$event.activeIndex];
        console.log(date)

        if (this.chartsInstance) {
            this.chartsInstance.showLoading('default', {
                text: '',
                color: '#03c0ff',
                textColor: '#000',
                maskColor: 'rgba(255, 255, 255, 0.5)',
                zlevel: 0
            });
        }
        this.queryData(date)
            .then((data) => {
                console.log(data);
                if (this.chartsInstance) {
                    this.chartsInstance.hideLoading();
                }
                this.refreshCharts(data);
            })
            .catch(() => {
                if (this.chartsInstance) {
                    this.chartsInstance.hideLoading();
                }
            });
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


    private queryData(date: string): Promise<any> {
        if (this.dataListObject[date]) {
            return Promise.resolve(this.dataListObject[date])
        } else {

            return this.http.get("./assets/json/charts.json")
                .map((response) => {

                    let data = response.json();
                    console.log(data);
                    if ('0' == data.code) {
                        Object.assign(this.dataListObject, data.information);
                    }
                    return this.dataListObject[date];
                }).toPromise();
        }
    }

    private refreshCharts(dataList: Array<any>) {

        let decimalPipe = new DecimalPipe("USD");

        let option = {
            tooltip: {
                show: false,
                trigger: 'item',
                alwaysShowContent: true,
                position: 'top',
                confine: true,
                padding: [5, 15],
                extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                formatter: function (params) {
                    console.log(params);
                    return params.name + ':' + decimalPipe.transform(params.value, '1.2-2') + "元，所占比例：" + params.percent + "%";
                }
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'top',
                data: [
                    {
                        name: '直接访问',
                        icon: 'circle'
                    }, {
                        name: '邮件营销',
                        icon: 'circle'
                    }, {
                        name: '联盟广告',
                        icon: 'circle'
                    }, {
                        name: '视频广告',
                        icon: 'circle'
                    }, {
                        name: '搜索引擎',
                        icon: 'circle'
                    }, {
                        name: '直接访问1',
                        icon: 'circle'
                    }, {
                        name: '邮件营销1',
                        icon: 'circle'
                    }, {
                        name: '联盟广告1',
                        icon: 'circle'
                    }, {
                        name: '视频广告1',
                        icon: 'circle'
                    }, {
                        name: '搜索引擎1',
                        icon: 'circle'
                    }],
                tooltip: {
                    show: true
                }
            },
            series: [
                {
                    name: '消费分析',
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['35%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '22',
                                fontWeight: 'bold'
                            },
                            formatter: function (params) {
                                return params.name + "\n" + params.percent + " % ";
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: [
                        {
                            value: 335,
                            name: '直接访问',
                            itemStyle: {
                                normal: {
                                    color: '#2aafef'
                                }
                            }
                        },
                        {
                            value: 310, name: '邮件营销',
                            itemStyle: {
                                normal: {
                                    color: '#f8347b'
                                }
                            }
                        },
                        {
                            value: 234, name: '联盟广告',
                            itemStyle: {
                                normal: {
                                    color: '#ffbb2f'
                                }
                            }
                        },
                        {
                            value: 135, name: '视频广告',
                            itemStyle: {
                                normal: {
                                    color: '#28dccf'
                                }
                            }
                        },
                        {
                            value: 1548, name: '搜索引擎',
                            itemStyle: {
                                normal: {
                                    color: '#bd3bbb'
                                }
                            }
                        },
                        {
                            value: 335,
                            name: '直接访问1',
                            itemStyle: {
                                normal: {
                                    color: '#2aafef'
                                }
                            }
                        },
                        {
                            value: 310, name: '邮件营销1',
                            itemStyle: {
                                normal: {
                                    color: '#f8347b'
                                }
                            }
                        },
                        {
                            value: 234, name: '联盟广告1',
                            itemStyle: {
                                normal: {
                                    color: '#ffbb2f'
                                }
                            }
                        },
                        {
                            value: 135, name: '视频广告1',
                            itemStyle: {
                                normal: {
                                    color: '#28dccf'
                                }
                            }
                        },
                        {
                            value: 1548, name: '搜索引擎1',
                            itemStyle: {
                                normal: {
                                    color: '#bd3bbb'
                                }
                            }
                        }
                    ]
                }
            ],

        };

        this.chartsInstance.setOption(option);
    }

}
