export default (new_data,new_color,new_layout,arr) => {
    return [...arr,{
        data:new_data,
        color:new_color,
        layout:new_layout
    }]
}