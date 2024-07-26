import FontAwesomeIcons from '../../../components/misc/Icons'

export default function SupportIcon({
    icon, children, onClick
}: { icon: FontAwesomeIcons, children: string, onClick?: Function }) {
    return (
        <div onClick={() => onClick && onClick()} className='support__icon'>
            <i className={icon} />

            <p>{children}</p>
        </div>
    )
}
