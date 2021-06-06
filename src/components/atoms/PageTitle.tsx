type PageTitleProps = {
    title: String
}

const PageTitle = ({title} : PageTitleProps) => {
    return (
        <h1 className='pageTitle'>{title}</h1>
    )
}

export default PageTitle;