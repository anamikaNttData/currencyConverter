// ====================================================
// IMPORTS
import React, { useEffect, useState } from 'react'
import styles from './convert.module.css'
import Select from '../../components/select/select'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { convertCurrency } from '../../reducers/dataReducer'
import { countTheNumberOfDecimalPlaces } from '../../utils/countTheNumberOfDecimalPlaces'

// ====================================================
// Component

const Convert = () => {
	// Variables
	const dispatch = useDispatch()
	const navigation = useNavigate ()
	let [from, setFrom] = useState('USD')
	let [to, setTo] = useState('INR')
	let [fromForm, setFromForm] = useState(1)	
	//let parsedUrl = queryString.parse(history.location.search.substr(1))

	// ====================================================
	// State
	const conversionRate = useSelector(
		state => state.data.conversionResult.conversion_rate
	)

	// ====================================================
	// Side effects
	useEffect(() => {
		let fromCount = fromForm
		let firstCurrency = from
		let secondCurrency = to

		if (firstCurrency) {
			setFrom((from = firstCurrency))
		}
		if (secondCurrency) {
			setTo((to = secondCurrency))
		}
		if (secondCurrency) {
			setFromForm((fromForm = fromCount))
		}

		dispatch(convertCurrency(from, to))
	}, [])

	// ====================================================
	// Functions
	const pushDataTUrl = () => {
		navigation.pushDataTUrl({
			pathname: `/`,
			search: `firstCurrency=${from}&secondCurrency=${to}&fromCount=${fromForm}`,
		})
	}

	// ====================================================
	// JSX
	return (
		<div className={styles.cardsWrap}>
			<div className={styles.card}>
				<Select
					onItemClick={currency => {
						setFrom((from = currency))
						dispatch(convertCurrency(from, to))
						pushDataTUrl()
					}}
					initialCurrency={from}
				/>
				<input
					type="number"
					className={styles.input}
					onChange={e => {
						setFromForm((fromForm = Number(e.target.value)))
						pushDataTUrl()
					}}
					value={fromForm === 0 ? '' : fromForm}
				/>
				<div
					onClick={() => {
						setFromForm((fromForm = ''))
					}}
					className={styles.clear}
				>
					clear
				</div>
			</div>
			<div className={styles.card}>
				<Select
					onItemClick={currency => {
						setTo((to = currency))
						dispatch(convertCurrency(from, to))
						pushDataTUrl()
					}}
					initialCurrency={to}
				/>
				<input
					type="text"
					value={
						countTheNumberOfDecimalPlaces(conversionRate * fromForm) < 4
							? conversionRate * fromForm
							: (conversionRate * fromForm).toFixed(4)
					}
					className={styles.input}
				/>
			</div>
		</div>
	)
}

// ====================================================
// Exports

export default React.memo(Convert)
