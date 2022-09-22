// ====================================================
// IMPORTS
import styles from './select.module.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// ====================================================
// Component

const Select = props => {
	// ====================================================
	// Variables
	let [isListVisible, setIsListVisible] = useState(false)

	// ====================================================
	// State
	const codes = useSelector(state => state.data.codes)

	// ====================================================
	// JSX
	return (
		<div className={styles.body}>
			<div
				onClick={() => {
					setIsListVisible((isListVisible = !isListVisible))
				}}
				className={styles.baseCurrency}
			>
				{props.initialCurrency}
			</div>
			{isListVisible && (
				<div className={styles.list}>
					{codes.map(item => (
						<div
							className={styles.item}
							onClick={() => {
								props.onItemClick(item[0])
								setIsListVisible(false)
							}}
						>
							{item[0]}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Select)
