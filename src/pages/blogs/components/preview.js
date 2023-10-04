export const preview = ({
    header,
    body,
    author,
    date,
    tags,
    image,
}) => {
    return (
        <div>
            <div
                style={{
                    margin: "10px auto",
                    width: "800px",
                }}
            >
                <div>
                    <img
                        src={image}
                        alt="thumbnail"
                        style={{
                            width: "782px",
                            height: "400px",
                            marginBottom: "10px",
                            borderRadius: "12px",
                            marginTop: "10px",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>
            <h1 style={{ marginBottom: "20px", fontSize: "36px" }}>
                {header}
            </h1>
            <hr></hr>
            <p style={{ padding: "10px 0" }}>
                Written by <strong>{author}</strong> . <i>{date}</i>
            </p>
            <hr style={{ marginBottom: "20px" }}></hr>
            <div
                style={{
                    margin: "10px auto",
                    width: "800px",
                }}
            >
                <div
                    style={{
                        textAlign: "justify",
                        marginBottom: "10px",
                    }}
                    dangerouslySetInnerHTML={{ __html: body }}
                ></div>
                <div
                    style={{
                        fontWeight: "bold",
                        fontStyle: "italic",
                    }}
                >
                    {tags?.length < 1
                        ? tags.map((t) => `#${t}`)
                        : tags.map((t) => `#${t} `)}
                </div>
            </div>
        </div>
    );
};
