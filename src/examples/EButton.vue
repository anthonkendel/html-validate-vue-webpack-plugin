<template>
	<div>
		<button :type="type">
			<!-- @slot button content, i.e. click me! -->
			<slot />
		</button>
	</div>
</template>

<script>
export default {
	name: "EButton",
	props: {
		type: {
			type: String,
			default: "",
		},
	},
};
</script>

<!-- htmlvalidate tag should always be written in JSON -->
<htmlvalidate>
{
  "inherit": "button"
}
</htmlvalidate>
