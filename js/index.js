$(function() {
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $(".carousel").carousel({
        interval: 2000
    })
    $("#modalDatos").on('shown.bs.modal', function(e) {
        $("#btnContactanos").addClass("btn-danger")
        $("#btnContactanos").removeClass("btn-primary")
        $("#btnContactanos").prop("disabled", true)
        console.log("el modal se esta abriendo")
    })
    $("#modalDatos").on('show.bs.modal', function(e) {
        console.log("el modal se abrio")
    })
    $("#modalDatos").on('hide.bs.modal', function(e) {
        $("#btnContactanos").removeClass("btn-danger")
        $("#btnContactanos").addClass("btn-primary")
        $("#btnContactanos").prop("disabled", false)

    })
    $("#modalDatos").on('hidden.bs.modal', function(e) {
        console.log("el modal se cerro")
    })
});
