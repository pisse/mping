
//读本地存储
function testRead(){
    console.log (MPing.EventSeries.getSeries() );

    console.log (MPing.EventSeries.getCached() );
}

//App写
function testWrite(){
    var series = '{{"level":1,"event_id":2,"event_param":3,"page_name":4,"page_param":4},' +
        '{"level":2,"event_id":22,"event_param":"aa","page_name":41,"page_param":44},' +
        '{"level":3,"event_id":12,"event_param":"bb","page_name":43,"page_param":34},' +
        '{"level":4,"event_id":42,"event_param":"cc","page_name":43,"page_param":24},' +
        '{"level":5,"event_id":12,"event_param":"dd","page_name":42,"page_param":14}}';
    MPing.EventSeries.writeSeries(series);
}



//更新事件串
function updateS(){
    var click = new MPing.inputs.Click();
    click.event_param = "first Click";
    click.event_id = "MyJD_Ordersnotfinish"; //2
    click.updateEventSeries();
    var mping = new MPing();
    mping.send(click);
    testRead();

    var click = new MPing.inputs.Click();
    click.event_param = "second Click";
    click.event_id = "Searchlist_Productid";//3
    click.updateEventSeries();
    var mping = new MPing();
    mping.send(click);
    testRead();

    var click = new MPing.inputs.Click();
    click.event_param = "th Click";
    click.event_id = "Productlist_Productid";//3
    click.updateEventSeries();
    var mping = new MPing();
    mping.send(click);
    testRead();

    var click = new MPing.inputs.Click();
    click.event_param = "th Click";
    click.event_id = "Home_HandSeckill";//1
    click.updateEventSeries();
    var mping = new MPing();
    mping.send(click);
    testRead();
}

//添加购物车
function testCart(){
    var cart = new MPing.inputs.AddCart("MyJD_Ordersnotfinish", "sku_1");
   // cart.event_param = "first Click";
   // cart.event_id = "MyJD_Ordersnotfinish"; //2
    var mping = new MPing();
    mping.send(cart);
    testRead();
}

//删除购物车
function testRemoveCart(){
    var cart = new MPing.inputs.RmCart("MyJD_Ordersnotfinish", "sku_1");
    // cart.event_param = "first Click";
    // cart.event_id = "MyJD_Ordersnotfinish"; //2
    var mping = new MPing();
    mping.send(cart);
    testRead();
}

//提交订单
function testOrder(){
    var skuids = ["sku_1","sku_2"];
    var ord_id = "order_test_id";
    for(var i=0; i<skuids.length; i++){
        var ord = new MPing.inputs.Order( skuids[i]);
        ord.order_id = ord_id;
        // cart.event_param = "first Click";
        // cart.event_id = "MyJD_Ordersnotfinish"; //2
        var mping = new MPing();
        mping.send(ord);
    }

    testRead();
}

//updateS();
