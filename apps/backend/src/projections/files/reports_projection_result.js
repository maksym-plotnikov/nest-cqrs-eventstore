options({
    resultStreamName: 'reports_projection_result',
    $includeLinks: false,
    reorderEvents: false,
    processingLag: 0,
});

fromStreams(['users_stream'])
    .when({
        $init: function () {
            return {};
        },
        UserCreatedEvent: function (state, event) {
            state[event.data.id] = event.data;
        },
    })
    .outputState();
