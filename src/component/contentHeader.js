export default function ContentHeader ({title='', breadcrumb =''}) {
    return (
        <>
            <div className="content-header d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="header-title">{title}</h1>
                </div>
                <div>
                    <ol className="d-flex">
                        <li className="title-item">Home</li>
                        <li className="title-item">/</li>
                        <li className="title-item">{breadcrumb}</li>
                    </ol>
                </div>
            </div>
        </>
    )
}