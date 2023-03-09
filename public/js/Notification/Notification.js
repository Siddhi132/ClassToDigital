
function deleteNotification(id) {
    $.ajax({
        url: '/deleteNotification',
        type: 'GET',
        data: {
            notificationId: id,
        },
        success: function (data) {
            $.ajax({
                url: 'http://localhost:5000/notification',
                type: 'GET',
                success: function (data) {
                    if (data.length == 0) {
                        $("#notification-ul-container").html(` <li>
                                <a class="dropdown-item "  href="#">No Notification Available</a>
                            </li>`);
                    } else {
                        var html = "";
                        data.forEach(function (element) {
                            html += `
                            <li class=" notification  ${element.notificationtype}>
                                <a class="dropdown-item " href="#">${element.notification}</a>
                                <div class="deleteNotificationIcon" onclick="deleteNotification('${element._id}')"><i class="fa-solid fa-times notification-i"></i></div>
                            </li>`
                        });
                        $("#notification-ul-container").html(html);
                    }

                }
            });
        }
    })
}
$(document).ready(function () {

    // /getNotifications ajax calll

    $.ajax({
        url: 'http://localhost:5000/notification',
        type: 'GET',
        success: function (data) {
            if (data.length == 0) {
                $("#notification-ul-container").html(` <li>
                                <a class="dropdown-item " href="#">No Notification Available</a>
                            </li>`);
            } else {
                var html = "";
                data.forEach(function (element) {
                    html += `
                            <li class=" notification  ${element.notificationtype}">
                                <a class="dropdown-item " href="#">${element.notification}</a>
                                <div class="deleteNotificationIcon" onclick="deleteNotification('${element._id}')"><i class="fa-solid fa-times notification-i"></i></div>
                            </li>`
                });
                $("#notification-ul-container").html(html);
            }

        }
    });
});
