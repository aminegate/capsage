$(document).ready(function () {
    
    
    
     (function() {
        $('tr').each(function() {
            var intituleCell = $(this).find('td[data-th="Intitule"]');
            var chequeCell = $(this).find('td[data-th="N° Cheque"]');
            
            if (intituleCell.text().includes('REG FACT')) {
                $(this).css({
                    'background-color': '#c1c1c1',
                    'color': 'white'
                });
            }

            if (intituleCell.text().includes('AVOIR')) {
                $(this).css({
                    'background-color': 'green',
                    'color': 'white'
                });
            }

            // Condition for "AVOIR" and "N° Cheque" not containing "compensation"
            if (intituleCell.text().toLowerCase().includes('avoir') && !chequeCell.text().toLowerCase().includes('compensation')) {
                $(this).css({
                    'background-color': 'orange',
                    'color': 'white'
                });
            }
        });

})();
 
     (function() {
    $('td[data-th="Operation"]').each(function(index) {
        const uniqueId = `customCheckbox_${index}`;
        const $input = $(this).find('input[type="checkbox"]');
        const $label = $(this).find('label');

        // Assign unique ID to the checkbox
        $input.attr('id', uniqueId);

        // Link the label to the checkbox
        $label.attr('for', uniqueId);
    });
})();

(function() {
    $('.radio-option input[type="radio"]').on('click', function(e) {
        // If the radio button is already checked, allow toggling off
        if ($(this).data('waschecked')) {
            $(this).prop('checked', false).data('waschecked', false);
        } else {
            // Otherwise, mark the current one as checked and reset others
            $('.radio-option input[type="radio"]').data('waschecked', false);
            $(this).data('waschecked', true);
        }
    });
})();
    
    (function() {
        const today = new Date();
        const firstDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const formattedDate = firstDayOfPrevMonth.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        $('#date_debut').val(formattedDate); // Set the default value
    })();
    (function() {

        // Set current date in the 'Date Fin' input
        const currentDate = new Date().toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
        $('#date_fin').val(currentDate);
   
})();



    /******************************* Side-bar Animation *****************************************/
    
    // dropdown menu
    $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
            $(".sidebar-dropdown").removeClass("active");
            $(this).parent().removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this).next(".sidebar-submenu").slideDown(200);
            $(this).parent().addClass("active");
        }
    });

    (function () {
    // Close sidebar on button click
    $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
    });

    // Open sidebar on button click
    $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
    });

    // Automatically close sidebar when screen width is <= 1024px
    $(window).resize(function () {
        if ($(window).width() <= 992) {
            $(".page-wrapper").removeClass("toggled");
        }
    }).trigger('resize'); // Trigger resize to check on page load
     })();
   
    (function () {

    // Check if the table exists before initializing DataTable
    if ($('#table__fiche__clients').length) {
        $('#table__fiche__clients').DataTable({
            paging: true,
            responsive: true,
            searching: true,
            ordering: false,
            info: false,
            pageLength: 30,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'colvis',
                    text: 'Toggle Columns'
                    },
                {
                    extend: 'excelHtml5',
                    text: 'Export to Excel'
                    },
                {
                    text: 'Refresh',
                    action: function (e, dt, node, config) {
                        dt.ajax.reload();
                    }
                    }
                ],
            language: {
                search: "Rechercher  :  ",
                lengthMenu: "Afficher _MENU_ enregistrements par page",
                info: "Affichage de _START_ à _END_ sur _TOTAL_ enregistrements",
                infoEmpty: "Aucun enregistrement à afficher",
                infoFiltered: "(filtré à partir de _MAX_ enregistrements au total)",
                paginate: {
                    first: '<i class="fa-solid fa-backward-step"></i>',
                    last: '<i class="fa-solid fa-forward-step"></i>',
                    next: '<i class="fa-solid fa-caret-right"></i>',
                    previous: '<i class="fa-solid fa-caret-left"></i>'
                },
                zeroRecords: "Aucun résultat trouvé",
                emptyTable: "Aucune donnée disponible dans le tableau"
            },
            lengthMenu: [5, 10, 25, 50],
            buttons: [
                {
                    extend: 'colvis',
                    text: '<i class="fa-solid fa-table-columns"></i>'
                    },
                {
                    extend: 'pageLength',
                    text: '<i class="fa-solid fa-arrow-down-1-9"></i>',
                    titleAttr: 'Select number of rows per page',
                    options: [
                            [5, 10, 15, -1],
                            ['5 rows', '10 rows', '15 rows', 'All rows']
                        ],
                    },
                {
                    extend: 'excelHtml5',
                    text: '<i class="fa-solid fa-file-excel"></i>'
                    },
                {
                    text: '<i class="fa-solid fa-arrows-rotate"></i>',
                    action: function (e, dt, node, config) {
                        dt.ajax.reload();
                    }
                    }
                ]
        });
    }

})();

    /******************************* Datalist Autocomplete *****************************************/

    (function () {
        var inputs = ['#clientNameInput'];
        var datalistes = ['#clientNameList'];

        inputs.forEach(function (inputSelector, index) {
            var input = $(inputSelector);
            var dataliste = $(datalistes[index]);

            input.on('focus', function () {
                dataliste.css('display', 'block');
            });

            // Handle option click
            dataliste.find('option').on('click', function () {
                input.val($(this).val());
                dataliste.css('display', 'none');
                input.css('border-radius', '5px');
            });

            input.on('input', function () {
                var text = input.val().toUpperCase();
                var hasVisibleOptions = false;

                dataliste.find('option').each(function () {
                    if ($(this).val().toUpperCase().indexOf(text) > -1) {
                        $(this).css('display', 'block');
                        hasVisibleOptions = true;
                    } else {
                        $(this).css('display', 'none');
                    }
                });

                dataliste.css('display', hasVisibleOptions ? 'block' : 'none');
            });

            // Handle keyboard navigation
            var currentFocus = -1;
            input.on('keydown', function (e) {
                var options = dataliste.find('option');

                if (e.keyCode === 40) { // Down arrow
                    currentFocus++;
                    addActive(options);
                } else if (e.keyCode === 38) { // Up arrow
                    currentFocus--;
                    addActive(options);
                } else if (e.keyCode === 13) { // Enter key
                    e.preventDefault();
                    if (currentFocus > -1) {
                        $(options[currentFocus]).click();
                    }
                }
            });

            function addActive(x) {
                if (!x) return false;
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = x.length - 1;
                $(x[currentFocus]).addClass('active');
            }

            function removeActive(x) {
                $(x).removeClass('active');
            }
        });

        // Close datalist on outside click
        $(document).on('click', function (event) {
            var target = $(event.target);
            if (!target.closest(inputs.join(',')).length && !target.closest(datalistes.join(',')).length) {
                $(datalistes.join(',')).css('display', 'none');
                inputs.forEach(function (inputSelector) {
                    $(inputSelector).css('border-radius', '5px');
                });
            }
        });
    })();

    /******************************* Sidebar Custom Event *****************************************/
    
    // Prevent scroll to top
    (function () {
        $('#show-sidebar').on('click', function (event) {
            event.preventDefault();
        });
    })();

});
