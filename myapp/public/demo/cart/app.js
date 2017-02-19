(function() {
    var init = function() {
        var orderForm = document.forms.order,
            saveBtn = document.getElementById('saveOrder'),
            saveBtnClicked = false;

        var saveForm = function() {
            if (!('formAction' in document.createElement('input'))) {
                var formAction = saveBtn.getAttribute('formaction');
                orderForm.setAttribute('action', formAction);
            }

            saveBtnClicked = true;
        };

        saveBtn.addEventListener('click', saveForm, false);

        // 计算产品的价格
        var qtyFields = orderForm.quantity,
            totalFields = document.getElementsByClassName('item_total'),
            orderTotalField = document.getElementById('order_total');

        var formatMoney = function(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // 计算每种产品的总金额以及整个订单的总金额
        var calculateTotals = function() {

            var ln = qtyFields.length,
                itemQty = 0,
                itemPrice = 0.00,
                itemTotal = 0.00,
                itemTotalMoney = '$0.0',
                orderTotal = 0.00,
                orderTotalMoney = '$0.00';

            for (var i = 0; i < ln; i++) {
                // 插入用于计算的循环语句
                // 获取每件产品的数量
                if (!!qtyFields[i].valueAsNumber) {
                    itemQty = qtyFields[i].valueAsNumber || 0;
                } else {
                    itemQty = parseFloat(qtyFields[i].value) || 0;
                }

                // 获取每件商品的单价
                if (!!qtyFields[i].dataset) {
                    itemPrice = parseFloat(qtyFields[i].dataset.price);
                } else {
                    itemPrice = parseFloat(qtyFields[i].getAttribute('data-price'));
                }

                itemTotal = itemQty * itemPrice;

                itemTotalMoney = '$' + formatMoney(itemTotal.toFixed(2));

                orderTotal += itemTotal;

                orderTotalMoney = '$' + formatMoney(orderTotal.toFixed(2));

                if (!!totalFields[i].value) {
                    totalFields[i].value = itemTotalMoney;
                    orderTotalField.value = orderTotalMoney;
                } else {
                    totalFields[i].innerHTML = itemTotalMoney;
                    orderTotalField.innerHTML = orderTotalMoney;
                }
            }
        };

        // 初始化计算，防止某个字段被预填充
        calculateTotals();

        // 添加事件侦听器
        var qtyListeners = function() {
            var ln = qtyFields.length;

            for (var i = 0; i < ln; i++) {
                qtyFields[i].addEventListener('input', calculateTotals, false);
                // IE9种不能侦测到退格键和删除键的按键操作以及剪切操作，所以绑定keyup事件
                qtyFields[i].addEventListener('keyup', calculateTotals, false);
            }
        }

        qtyListeners();

        var doCustomValidity = function(field, msg) {
            if ('setCustomValidity' in field) {
                field.setCustomValidity(msg);
            } else {
                field.validationMessage = msg;
            }
        };

        var validateForm = function() {
            doCustomValidity(orderForm.name, '');
            doCustomValidity(orderForm.password, '');
            doCustomValidity(orderForm.confirm_password, '');
            doCustomValidity(orderForm.card_name, '');

            if (!Modernizr.inputtypes.month || !Modernizr.input.pattern) {
                fallbackValidation();
            }

            if (orderForm.name.value.length < 4) {
                doCustomValidity(
                    orderForm.name, 'Full Name must be at least 4 characters long'
                );
            }
            if (orderForm.password.value.length < 8) {
                doCustomValidity(
                    orderForm.password,
                    'Password must be at least 8 characters long'
                );
            }

            if (orderForm.password.value != orderForm.confirm_password.value) {
                doCustomValidity(
                    orderForm.confirm_password,
                    'Confirm Password must match Password'
                );
            }

            if (orderForm.card_name.value.length < 4) {
                doCustomValidity(
                    orderForm.card_name,
                    'Name on Card must be at least 4 characters long'
                );
            }

        };
        orderForm.addEventListener('input', validateForm, false);
        orderForm.addEventListener('keyup', validateForm, false);

    };

    window.addEventListener('load', init, false);
})();
