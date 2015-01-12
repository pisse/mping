new MPing(function(){
    var pv = new MPing.inputs.PV();
    this.send(pv);

    MPing.inputs.Click.attachEvent();

    /* var click = new MPing.inputs.Click();
     click.event_param = "";
     click.event_id = "";
     click.event_func = function(){console.log("click")};
     this.send(click);*/

});