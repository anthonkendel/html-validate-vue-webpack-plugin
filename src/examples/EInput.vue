<template>
	<div>
		<input :type="type" />
	</div>
</template>

<script>
export default {
	name: "EInput",
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
  "inherit": "input"
}
</htmlvalidate>
