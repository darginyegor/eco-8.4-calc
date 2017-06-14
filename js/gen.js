function generate() {
    $('#a1').val(Math.round(100+(Math.random()*100)));
    $('#kp1').val(1+Math.round(Math.random()*4));
    $('#a2').val(Math.round(50+(Math.random()*100)));
    $('#kp2').val(1+Math.round(Math.random()*4));

    $('#tca').val(Math.round(Math.random()*10));
    $('#tcb').val(Math.round(Math.random()*10));
    $('#tcc').val(Math.random().toFixed(2));
    calculate();
}