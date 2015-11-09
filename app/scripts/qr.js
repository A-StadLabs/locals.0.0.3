function read(a)
{
    $("#qr-value").text(a);
    console.log('got it: ',a);
}
    
qrcode.callback = read;