options({
    $includeLinks: false,
    reorderEvents: false,
    processingLag: 0,
});

fromStreams(['reports_stream', 'user_streams'])
    .when({
        $init: function () {
            return {};
        },
        UserReportSubmit: function (state, event) {
            state[event.data.userId] = event.data;
        },
    })
    .outputState();
