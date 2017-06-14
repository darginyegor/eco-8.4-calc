function calculate () {
    $('#left').addClass('disabled');
    $('#right').addClass('disabled');

    $('#left').removeClass('green');
    $('#right').removeClass('green');

    $('#ql').text('');
    $('#pl').text('');
    $('#pil').text('');

    $('#qr').text('');
    $('#pr').text('');
    $('#pir').text('');

    var a1 = Number($('#a1').val());
    var kp1 = Number($('#kp1').val());
    var a2 = Number($('#a2').val());
    var kp2 = Number($('#kp2').val());

    var tca = Number($('#tca').val());
    var tcb = Number($('#tcb').val());
    var tcc = Number($('#tcc').val());
    
    var A = [[((2/kp1)+(2*tcc)), (2*tcc)], [(2*tcc), ((2/kp2)+(2*tcc))]];
    var X = [((a1/kp1)-tcb), ((a2/kp2)-tcb)];

    qs = gauss(A, X);
    q1 = Math.round(qs[0]*10)/10;
    q2 = Math.round(qs[1]*10)/10;
    q = q1+q2;

    p1 = Math.round((a1/kp1 - q1/kp1)*10)/10;
    p2 = Math.round((a2/kp2 - q2/kp2)*10)/10;

    pi = Math.round((p1*q1) + (p2*q2) - (tca) - (tcb*q) - (tcc*q*q));

    $('#p1').text(p1);
    $('#p2').text(p2);
    $('#pi').text(pi);

    pil = NaN;
    pir = NaN;
    for (let q=0; q<=a2/kp2; q+=0.01) {
        mc = Math.round((tcb + tcc*2*q)*100)/100;
        mr = Math.round((a1 - 2*kp1*q)*100)/100;
        if (mc==mr) {
            Q = Math.round(q*100)/100;
            p1d = a1 - kp1*Q;
            p1d = Math.round(p1d*10)/10;
            pil = Math.round((p1d*Q-tca-tcb*Q-tcc*Q*Q)*10)/10;
            $('#left').removeClass('disabled');
            $('#ql').text(Q);
            $('#pl').text(p1d);
            $('#pil').text(pil);
        }
    }
    for (let q=a2/kp2; q<=(a1+a2); q+=0.01) {
        mc = Math.round((tcb + tcc*2*q)*100)/100;
        mr = Math.round(((a1+a2)/(kp1+kp2) - (q*2)/(kp1+kp2))*100)/100;
        if (mc==mr) {
            Q = Math.round(q*10)/10;
            p2d = (a1+a2)/(kp1+kp2) - q/(kp1+kp2);
            p2d = Math.round(p2d*10)/10;
            pir = Math.round((p2d*Q-tca-tcb*Q-tcc*Q*Q)*10)/10;
            $('#right').removeClass('disabled');
            $('#qr').text(Q);
            $('#pr').text(p2d);
            $('#pir').text(pir);
        }
    }
    if (pil > pir) {
        $('#left').addClass('green');
    }
    else if (pir > pil) {
        $('#right').addClass('green');
    }
    $('#answer').show(400);
}