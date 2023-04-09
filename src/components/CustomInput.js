export default ({ inputValue, setInputValue, label , inputType}) => {
    return (
        <div className="user-box">
            <label>{label}</label>
            <input
                type={inputType}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
};
