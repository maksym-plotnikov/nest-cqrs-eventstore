options({
    resultStreamName: 'users_projection_result',
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
        UserUpdatedEvent: function (state, event) {
            state[event.data.id] = {
                ...state[event.data.id],
                ...event.data,
            };
        },
        UserDeletedEvent: function (state, event) {
            delete state[event.data.id];
        },
    })
    .outputState();
