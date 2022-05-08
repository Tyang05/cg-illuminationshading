#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    for(int i = 0; i < 10; i++) {
        ambient = light_ambient * material_color;

        vec3 light_vector = normalize(light_position[i] - frag_pos);
        vec3 normalized_frag = normalize(frag_normal);
        diffuse += light_color[i] * material_color * max(dot(normalized_frag, light_vector), 0.0);
        
        vec3 view_vector = normalize(camera_position - frag_pos);
        vec3 reflection_vector = 2.0*(max(dot(normalized_frag, light_vector),0.0))*(normalized_frag-light_vector);;
        specular += light_color[i] * material_specular * pow(max(dot(reflection_vector, view_vector), 0.0), material_shininess);
    }

    FragColor = vec4(ambient + diffuse + specular, 1.0);
}
