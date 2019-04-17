export default (new_data, new_color, new_layout) => {
    return (state) => {
        state.terminal_data = state.terminal_data.concat({
            data: new_data,
            color: new_color,
            layout: new_layout
        })
        return state
    }
}