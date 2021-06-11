export default function LoadingBackground(props) {
    return (
        <div>
            { (props.sheet === 'loading' || props.sheet === 'redirect') &&
            <div id="loadingPanel">
                { props.sheet === 'loading' && <span className="blink" style={{ opacity: 0.3, transition: "all 0.3s ease-in" }}>Привет, как насчет пиццы?</span> }
                { props.sheet === 'redirect' && <span className="blink" style={{ opacity: 0.3, transition: "all 0.3s ease-in" }}>Телепортируемся..</span> }
            </div>
            }
        </div>
    )
}