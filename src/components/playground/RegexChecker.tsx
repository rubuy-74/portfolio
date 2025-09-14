import { useState } from 'react'

interface ValidationResult {
	isValid: boolean;
	loading: boolean;
	idle: boolean;
}

export default function RegexChecker() {
	const [regex, setRegex] = useState('')
	const [testString, setTestString] = useState('')
	const [result, setResult] = useState<ValidationResult>({ isValid: true, loading: false, idle: true })
	const [error, setError] = useState('')

	const handleCheck = async () => {
		setResult({ isValid: false, loading: true, idle: true })

		if (regex.length == 0) {
			setError("error: empty regex")
			setResult({ isValid: false, loading: false, idle: true })
			return
		}
		if (testString.trim().length == 0) {
			setError("error: empty test string")
			setResult({ isValid: false, loading: false, idle: true })
			return
		}
		try {
			const response = await fetch('/api/pstr/check', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					regex: regex,
					string: testString.trim(),
				}),
			})

			if (!response.ok) {
				setError(`error: application failed`)
				throw new Error('Network response was not ok')
			}
			setError("")

			const data = await response.json()

			setResult({
				isValid: data.valid === true,
				loading: false,
				idle: false
			})
		} catch (error) {
			console.error('Error checking regex:', error)
			setResult({ isValid: false, loading: false, idle: true })
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="text-3xl font-bold">pstr - Regex Engine</h1>
				<h2 className='text-secondary'>
					Note: This project is in ongoing development
				</h2>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<label className="text-sm">Regular Expression</label>
					<div className="flex gap-4 items-center">
						<input
							type="text"
							placeholder="insert regex here"
							className="flex-1 p-2 rounded-lg bg-[#1e1e1e] border border-gray-600 focus:border-secondary focus:outline-none"
							value={regex}
							onChange={(e) => setRegex(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm">Test String</label>
					<textarea
						placeholder="insert your test string here"
						rows={4}
						className="p-2 rounded-lg bg-[#1e1e1e] border border-gray-600 focus:border-secondary focus:outline-none resize-none"
						value={testString}
						onChange={(e) => setTestString(e.target.value)}
					></textarea>

				</div>


				<div className='flex justify-between'>
					<button
						type="button"
						onClick={handleCheck}
						disabled={result.loading}
						className="self-end px-4 py-2 rounded-lg bg-secondary hover:bg-[#a0503a] transition-colors text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{result.loading ? 'Checking...' : 'Check'}
					</button>
					{
						(!result.idle && error.length == 0) ?
							<div className={`flex items-center border px-3 py-1 rounded-md text-sm font-medium ${result.isValid
								? 'bg-green-500/20 text-green-500 border-green-600'
								: 'bg-red-500/20 text-red-500 border-red-600'}`}>
								{result.isValid ? 'Valid' : 'Invalid'}
							</div>
							:
							<div className='text-red-500 flew items-start'>
								{error}
							</div>
					}
				</div>
			</div>
		</div>
	)
}
