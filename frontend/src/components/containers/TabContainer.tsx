import { MouseEventHandler, ReactNode, useState } from 'react'
import Button from '../buttons/Button'
import { AnimatePresence, motion } from 'framer-motion'

export default function TabContainer({ id, tabs }: { tabs: { label: string, content: ReactNode }[], id: string }) {
    let navArr: NavItemProps[] = []
    let contentArr: ReactNode[] = []
    const [currentTabIndex, setCurrentTabIndex] = useState(0)

    tabs?.forEach((tab, index) => {

        navArr.push({ children: tab.label, onClick: () => setCurrentTabIndex(index), active: currentTabIndex === index })

        contentArr.push(
            <Tab key={`tabs-container-tab-${id}-${index}`}>{tab.content}</Tab>
        )

    })


    return (
        <div className='tabs-container'>
            <nav className='tabs-container__nav'>
                {navArr.map((navItemProps, index) => {
                    return <NavItem key={`tabs-container-nav-item-${id}-${index}`} {...navItemProps} />
                })}
            </nav>

            <AnimatePresence>
                {contentArr[currentTabIndex]}
            </AnimatePresence>



        </div >
    )
}

interface NavItemProps {
    children: string,
    onClick: MouseEventHandler<HTMLButtonElement>
    active: boolean
}
const NavItem = ({ children, onClick, active }: NavItemProps) =>
    <Button
        onClick={onClick}
        variant={active ? "primary" : "outlined"}
        className='tabs-container__nav__button'
    >
        {children}
    </Button>

const Tab = ({ children }: { children: ReactNode }) =>
    <motion.div
        className='tabs-container__tab'
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{ duration: .25, ease: 'easeOut' }}
    >
        {children}
    </motion.div>
