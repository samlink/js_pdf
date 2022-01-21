(function () {
    const { jsPDF } = window.jspdf;

    document.querySelector('#pdf-out').addEventListener('click', function () {
        let data = {
            date: '2022-01-19',
            bh: 'XS20220119019',
            sender: '北京市鑫利机电设备有限公司',
            contact: "刘卫",
            tel: '13988999999',
            receiv: '天津捷维特石油技术有限公司',
            content2: '徐明',
            tel2: '13566778888',
            addr: '天津南开区',
            logis: '顺丰快递 123456789',
            zhang: "/assets/img/zhang.png",  //图片不能跨域请求，必须放于本地服务器
        }

        let content = `
            <div id="pdf1">
                <h1 style="font-size: 18px;margin-left: 180px;margin-bottom: 30px;">欠款发货协议书</h1>
                <p> <span>签订日期：${data.date}</span><span style="margin-left: 200px;">编号：${data.bh}</span></p>
                <p>发货人（甲方）：${data.sender}</p>
                <p><span  style="margin-right: 100px;">电话：${data.tel}</span><span>联系人：${data.contact}</span></p>
                <p>收货人/欠款人（乙方）：${data.receiv}</p>
                <p><span  style="margin-right: 100px;">电话：${data.tel2}</span> 联系人：${data.content2}</p>
                <p>地址：${data.addr} </p>
                <p>　</p>
                <P> 一、甲乙双方就下述欠款发货事宜达成协议。（详见附件一）</P>
                <p> 二、交提货方式： </p>
                <p>甲方通过如下方式发货：</p>
                <p>${data.logis}</p>
                <p> 乙方在提货时对货物进行验收，出库后概不负责。</p>
                <p>三、付款方式：</p>
                <p> 参见双方签订的《货款月结协议》编号：</p>
                <p> 四、本协议书一式两份，签字盖章确认后成立，复印件亦有效。</p>
                <p>　</p>
                <div id="zhang"><img src="${data.zhang}" width="120px"></div>
                <p style="margin-top: -80px;margin-left: 10px;"><span>甲方 ：（盖章）</span> <span style="margin-left: 214px;">乙方：</span></p>
                <p>　</p>
                <p style="margin-top: -20px;margin-left: 20px;">${data.date}</p>
                <p>　</p>
                <p>　</p>
                <p>　</p>
            </div>
    
            <div id="pdf2" style="font-size: 11px;">
    <style type="text/css"> 
 
#pdf-table td{border-left:1px solid #ddd;border-top:1px solid #ddd} 
#pdf-table{border-right:1px solid #ddd;border-bottom:1px solid #ddd; border-left:1px solid #ddd;border-top:1px solid #ddd}
 
    </style> 
                <p>附件一：</p>
                <p>这是第二页，是个表格，演示插入新页和分页，</p>
                <table id="pdf-table">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
    `;

        let pdf_content = document.querySelector("#pdf-content");
        pdf_content.innerHTML = content;

        //A4 纸张
        var pdf = new jsPDF('', 'pt', 'a4');

        let option = {
            //a4 的宽度，px单位，如不设置，将默认按屏幕分辨率设置，造成不一致的问题
            width: 538,
        }

        html2canvas(document.querySelector("#pdf1"), option).then(canvas => {
            //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
            pdf.addImage(canvas, 'JPEG', 40, 30, 595.28, 595.28 / canvas.width * canvas.height);
            pdf.addPage();

            //分页的一种方式，如果项目仅需一、两页，可以这样操作，否则，请参考“相关网址”中的例子，进行完善
            html2canvas(document.querySelector("#pdf2"), option).then(canvas => {
                pdf.addImage(canvas, 'JPEG', 30, 20, 595.28, 595.28 / canvas.width * canvas.height);
                pdf.save('协议.pdf');
            });
        });
    });
})();

